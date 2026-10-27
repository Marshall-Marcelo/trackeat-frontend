import Button from '@/components/Button';
import { useState } from 'react';
import { Plus, X, CircleX } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useIsMobile } from '@/hooks/useIsMobile';
import { toast } from 'sonner';
import type { NewMeal } from '@/types/tracker';

const MealInput = () => {
  const [mealName, setMealName] = useState<string | undefined>(undefined);
  const [mealSelect, setMealSelect] = useState<'type' | 'category' | undefined>(
    undefined,
  );
  const [isOverlayOn, setIsOverlayOn] = useState<boolean>(false);
  const [mealType, setMealType] = useState<string | undefined>(undefined);
  const [mealCategories, setMealCategories] = useState<string[]>([]);
  const [mealDate, setMealDate] = useState<string | undefined>(undefined);

  const isMobile = useIsMobile();

  const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

  const mealCategorySelection = [
    'Chicken',
    'Beef',
    'Pork',
    'Fish',
    'Vegetable',
    'Rice',
    'Bread',
  ];

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

  const selectMealType = (type: string) => {
    setMealType(type);
    setIsOverlayOn(false);
  };

  const selectMealCategory = (category: string) => {
    for (const selectedCategory of mealCategories) {
      if (selectedCategory === category) {
        toast(`${selectedCategory} already selected`);
        return;
      }
    }

    setMealCategories((prev) => [...prev, category]);
    setIsOverlayOn(false);
  };

  const removeMealCategory = (category: string) => {
    setMealCategories((prev) =>
      prev.filter((existingCateogory) => existingCateogory !== category),
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

    const newMeal: NewMeal = {
      mealName: mealName,
      mealType: mealType,
      mealCategories: mealCategories,
      mealDate: mealDate,
    };

    console.log(newMeal);
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
        <Button onClick={openMealTypeOverlay} className="w-fit ">
          {mealType ? mealType : 'Select'}
        </Button>
      </div>

      <div className="flex flex-col">
        <span className="text-lg">Meal Category/s</span>
        <div className="flex items-center flex-wrap gap-2">
          {mealCategories &&
            mealCategories.map((selectedCategory, i) => {
              return (
                <div className="relative" key={selectedCategory + i}>
                  <span
                    onClick={() => removeMealCategory(selectedCategory)}
                    className="absolute -right-2 -top-2"
                  >
                    <CircleX color="white" fill="red" size={16} />
                  </span>
                  <span className="border px-2 py-1 rounded">
                    {selectedCategory}
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
          className="border rounded-md"
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
            {mealSelect === 'type' ? (
              <>
                {mealTypes.map((type, i) => {
                  return (
                    <Button key={type + i} onClick={() => selectMealType(type)}>
                      {type}
                    </Button>
                  );
                })}
              </>
            ) : mealSelect === 'category' ? (
              <>
                {mealCategorySelection.map((category, i) => {
                  return (
                    <Button
                      onClick={() => selectMealCategory(category)}
                      key={category + i}
                    >
                      {category}
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
