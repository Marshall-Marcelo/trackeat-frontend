import { useState } from 'react';
import { Route } from '@/routes/app/edit-meal/$mealId';
import {
  useGetSelectedMeal,
  useGetMealCategories,
  useGetMealTypes,
  useEditMeal,
} from '@/hooks/useMeal';
import type {
  MealCategory,
  MealType,
  Meal,
  ExistingMealEdit,
} from '@/types/meal';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import { toast } from 'sonner';
import { Plus, X, CircleX } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useNavigate } from '@tanstack/react-router';

const EditMeal = () => {
  const { mealId } = Route.useParams();
  const { data: meal, isPending: isFetchingMeal } = useGetSelectedMeal(mealId);
  const { data: mealCategorySelection, isPending: isFetchingCategories } =
    useGetMealCategories();
  const { data: mealTypes, isPending: isFetchingTypes } = useGetMealTypes();

  if (isFetchingMeal || isFetchingCategories || isFetchingTypes) {
    return <Loader />;
  }

  if (!meal || !mealCategorySelection || !mealTypes) return <p>Not Found</p>;

  return (
    <EditMealForm
      meal={meal}
      mealCategorySelection={mealCategorySelection}
      mealTypes={mealTypes}
    />
  );
};

type EditMealFormProps = {
  meal: Meal;
  mealCategorySelection: MealCategory[];
  mealTypes: MealType[];
};

const EditMealForm = ({
  meal,
  mealCategorySelection,
  mealTypes,
}: EditMealFormProps) => {
  const [mealName, setMealName] = useState<string | undefined>(meal.mealName);
  const [mealType, setMealType] = useState<MealType | undefined>(meal.mealType);
  const [mealCategories, setMealCategories] = useState<MealCategory[]>(
    meal.mealCategories ?? [],
  );
  const [mealDate, setMealDate] = useState<string | undefined>(meal.mealDate);

  const [mealSelect, setMealSelect] = useState<'type' | 'category' | undefined>(
    undefined,
  );
  const [isOverlayOn, setIsOverlayOn] = useState<boolean>(false);

  const navigate = useNavigate();
  const { mutate: editMeal, isPending: isEditingMeal } = useEditMeal();

  const openMealTypeOverlay = () => {
    setMealSelect('type');
    setIsOverlayOn(true);
  };

  const openMealCategoryOverlay = () => {
    setMealSelect('category');
    setIsOverlayOn(true);
  };

  const closeOverlay = () => {
    setMealSelect(undefined);
    setIsOverlayOn(false);
  };

  const selectMealType = (type: MealType) => {
    setMealType(type);
    setIsOverlayOn(false);
  };

  const selectMealCategory = (category: MealCategory) => {
    const isSelected = mealCategories.some(
      (ctg) => ctg.categoryId === category.categoryId,
    );

    if (isSelected) {
      toast(`${category.categoryName} already selected`);
      return;
    }

    setMealCategories((prev) => [...prev, category]);
    setIsOverlayOn(false);
  };

  const removeMealCategory = (category: MealCategory) => {
    setMealCategories((prev) =>
      prev.filter(
        (existingCateogory) =>
          existingCateogory.categoryId !== category.categoryId,
      ),
    );
  };

  const submitEditedMeal = () => {
    if (!mealName) {
      toast('Meal Name missing');
      return;
    }
    if (!mealType) {
      toast('Meal Type missing');
      return;
    }
    if (mealCategories.length === 0) {
      toast('Meal Category/s missing');
      return;
    }
    if (!mealDate) {
      toast('Meal Date missing');
      return;
    }

    if (isEditingMeal) return <Loader />;

    const categoryIds = mealCategories.map((category) => category.categoryId);

    const editedMeal: ExistingMealEdit = {
      mealId: meal.mealId,
      mealName: mealName,
      mealType: mealType.typeId,
      mealCategories: categoryIds,
      mealDate: mealDate,
    };

    editMeal(editedMeal, {
      onSuccess: (data) => {
        toast.success(data.message);
        navigate({ to: '/app/tracker' });
      },
      onError: (error) => {
        toast.error(error.message);
        console.error('Meal edit error', error);
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <h1>
        Editing <span className="font-semibold">{meal?.mealName}</span>
      </h1>

      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold">Meal Name</span>
        <input
          id="67"
          className="border rounded-sm p-2 text-sm"
          placeholder="Meal Name"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold">Meal Type</span>
        <Button onClick={openMealTypeOverlay} className="w-fit">
          {mealType ? mealType.typeName : 'Select'}
        </Button>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold">Meal Category/s</span>
        <div className="flex items-center flex-wrap gap-2">
          {mealCategories &&
            mealCategories.map((selectedCategory, i) => {
              return (
                <div className="relative" key={selectedCategory.categoryId + i}>
                  <span
                    onClick={() => removeMealCategory(selectedCategory)}
                    className="absolute -right-2 -top-2"
                  >
                    <CircleX color="white" fill="red" size={16} />
                  </span>
                  <span className="border px-2 py-1 rounded">
                    {selectedCategory.categoryName}
                  </span>
                </div>
              );
            })}
          <Button
            onClick={openMealCategoryOverlay}
            className="w-fit h-7.25 flex items-center"
          >
            Add <Plus size={16} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold">Meal Date</span>
        <input
          className="border rounded-md w-fit py-1 px-2"
          type="date"
          value={mealDate}
          onChange={(e) => setMealDate(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mt-auto pb-2">
        <Link disabled={isEditingMeal} className="w-full" to={'/app/tracker'}>
          <Button>Cancel</Button>
        </Link>
        <Button disabled={isEditingMeal} onClick={submitEditedMeal}>
          {isEditingMeal ? <Loader /> : 'Submit'}
        </Button>
      </div>

      {isOverlayOn && (
        <div className="absolute top-0 left-0 w-full bg-white h-full p-4">
          <div className="flex justify-end">
            <X onClick={closeOverlay} />
          </div>
          <div className="grid grid-cols-2 gap-6 pt-2">
            {mealSelect === 'type' && mealTypes ? (
              <>
                {mealTypes.map((type) => {
                  return (
                    <Button
                      key={type.typeId}
                      onClick={() => selectMealType(type)}
                    >
                      {type.typeName}
                    </Button>
                  );
                })}
              </>
            ) : (
              mealSelect === 'category' &&
              mealCategorySelection && (
                <>
                  {mealCategorySelection.map((category) => {
                    return (
                      <Button
                        onClick={() => selectMealCategory(category)}
                        key={category.categoryId}
                      >
                        {category.categoryName}
                      </Button>
                    );
                  })}
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMeal;
