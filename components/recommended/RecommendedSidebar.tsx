import { FiltersForm } from "./FiltersForm";
import { Quote } from "./Quote";
import { WorkoutInfo } from "./WorkouInfo";

interface RecommendedSidebarProps {
  onApplyFilters: (filters: { title?: string; author?: string }) => void;
}

export const RecommendedSidebar = ({
  onApplyFilters,
}: RecommendedSidebarProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:gap-8 xl:flex-col">
      <FiltersForm onApply={onApplyFilters} />
      <WorkoutInfo />
      <Quote />
    </div>
  );
};
