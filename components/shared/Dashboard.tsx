import { LibrarySidebar } from "../library/LibrarySidebar";
import { RecommendedSidebar } from "../recommended/RecommendedSidebar";

interface DashboardProps {
  variant: "recommended" | "library" | "reading";
  onApplyFilters?: (filters: {
    title?: string;
    author?: string;
    totalPages?: number;
  }) => void;
  onBookAdded?: () => void;
}

export const Dashboard = ({
  variant,
  onApplyFilters,
  onBookAdded,
}: DashboardProps) => {
  return (
    <aside className="flex flex-col bg-blocks p-[20px] rounded-[30px] md:p-[32px] xl:pb-[20px]   xl:px-[20px] xl:pt-[40px] xl:w-[353px]">
      {variant === "recommended" && onApplyFilters && (
        <RecommendedSidebar onApplyFilters={onApplyFilters} />
      )}
      {variant === "library" && onApplyFilters && (
        <LibrarySidebar onBookAdded={onBookAdded} />
      )}
    </aside>
  );
};
