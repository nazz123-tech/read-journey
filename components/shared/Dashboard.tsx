import { LibrarySidebar } from "../library/LibrarySidebar";
import { RecommendedSidebar } from "../recommended/RecommendedSidebar";

interface DashboardProps {
  variant: "recommended" | "library" | "reading";
  onApplyFilters?: (filters: {
    title?: string;
    author?: string;
    totalPages?: number;
  }) => void;
}

export const Dashboard = ({ variant, onApplyFilters }: DashboardProps) => {
  return (
    <aside className="flex flex-col bg-blocks p-[20px] rounded-[30px] md:p-[32px]">
      {variant === "recommended" && onApplyFilters && (
        <RecommendedSidebar onApplyFilters={onApplyFilters} />
      )}
      {variant === "library" && onApplyFilters && (
        <LibrarySidebar onApplyFilters={onApplyFilters} />
      )}
    </aside>
  );
};
