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
    <aside>
      {variant === "recommended" && onApplyFilters && (
        <RecommendedSidebar onApplyFilters={onApplyFilters} />
      )}
      {variant === "library" && onApplyFilters && (
        <LibrarySidebar onApplyFilters={onApplyFilters} />
      )}
    </aside>
  );
};
