import Button from '@/components/Button';
import { useState } from 'react';
import { Plus, X, CircleX } from 'lucide-react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useIsMobile } from '@/hooks/useIsMobile';
import { toast } from 'sonner';
import type { NewMeal, MealCategory, MealType } from '@/types/meal';
import {
  useCreateNewMeal,
  useGetMealCategories,
  useGetMealTypes,
} from '@/hooks/useMeal';

const MealInput = () => {
  const [mealName, setMealName] = useState<string | undefined>(undefined);
  const [mealSelect, setMealSelect] = useState<'type' | 'category' | undefined>(
    undefined,
  );
  const [isOverlayOn, setIsOverlayOn] = useState<boolean>(false);
  const [mealType, setMealType] = useState<MealType | undefined>(undefined);
  const [mealCategories, setMealCategories] = useState<MealCategory[]>([]);
  const [mealDate, setMealDate] = useState<string | undefined>(undefined);

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const { mutate: createMeal, isPending: isCreatingMeal } = useCreateNewMeal();
  const { data: mealCategorySelection, isPending: isFetchingCategories } =
    useGetMealCategories();
  const { data: mealTypes, isPending: isFetchingTypes } = useGetMealTypes();

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

  const submitMeal = () => {
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

    if (isCreatingMeal) return <h1>Loading</h1>;

    const categoryIds = mealCategories.map((category) => category.categoryId);

    const newMeal: NewMeal = {
      mealName: mealName,
      mealType: mealType.typeId,
      mealCategories: categoryIds,
      mealDate: mealDate,
    };

    createMeal(newMeal, {
      onSuccess: (data) => {
        toast.success(data.message);
        navigate({ to: '/app/tracker' });
      },
      onError: (error) => {
        toast.error(error.message);
        console.error('Error logging in', error);
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-0.5">
        <span className="text-lg">Meal Name</span>
        <input
          id="67"
          className="border rounded-sm p-2 text-sm"
          placeholder="Meal Name"
          onChange={(e) => setMealName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-lg">Meal Type</span>
        <Button onClick={openMealTypeOverlay} className="w-fit">
          {mealType ? mealType.typeName : 'Select'}
        </Button>
      </div>

      <div className="flex flex-col">
        <span className="text-lg">Meal Category/s</span>
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
        <span className="text-lg">Meal Date</span>
        <input
          className="border rounded-md w-fit py-1 px-2"
          type="date"
          onChange={(e) => setMealDate(e.target.value)}
        />
      </div>

      <div className="flex gap-2 mt-auto pb-2">
        <Link className="w-full" to={'/app/tracker'}>
          <Button>Cancel</Button>
        </Link>
        <Button onClick={submitMeal}>Submit</Button>
      </div>

      {isMobile && isOverlayOn && (
        <div className="absolute top-0 left-0 w-full bg-white h-full p-4">
          <div className="flex justify-end">
            <X onClick={closeOverlay} />
          </div>
          <div className="grid grid-cols-2 gap-6 pt-2">
            {mealSelect === 'type' && mealTypes && !isFetchingTypes ? (
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
            ) : mealSelect === 'category' &&
              mealCategorySelection &&
              !isFetchingCategories ? (
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
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealInput;
