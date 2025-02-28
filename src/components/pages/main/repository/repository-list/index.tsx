import React from "react";
import { useUserRepositoryContext } from "@/contexts/user-repository.context";
import { RepositoryCard } from "../../repository/repository-card";
import { RepositoryCardPlaceholder } from "../../repository/repository-card-placeholder";
import { Message } from "@/components/ui/message";

export const RepositoryList: React.FC = () => {
  const {
    repositories,
    isLoadingRepositories,
    isFetchingNextRepositories,
    hasNextPageRepositories,
    paramsGetRepositories,
    fetchNextPageRepositories,
  } = useUserRepositoryContext();

  return (
    <>
      {repositories.map((repo) => (
        <RepositoryCard
          key={repo.id}
          repoName={repo.full_name}
          repoUrl={repo.html_url}
          description={repo.description}
          language={repo.language}
          stars={repo.stargazers_count ?? 0}
          updatedAt={repo.updated_at}
        />
      ))}

      <RepositoryCardPlaceholder
        count={paramsGetRepositories.per_page}
        isVisible={isLoadingRepositories || isFetchingNextRepositories}
      />

      {!repositories.length &&
        !hasNextPageRepositories &&
        !isFetchingNextRepositories &&
        !isLoadingRepositories && (
          <Message message="This user hasn’t shared any repositories yet. Check back later or explore other users." />
        )}

      {hasNextPageRepositories && (
        <button
          role="button"
          onClick={() => fetchNextPageRepositories()}
          disabled={!hasNextPageRepositories || isFetchingNextRepositories}
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-md py-2 text-sm text-white hover:bg-[#161b22] transition duration-300 ease-in-out cursor-pointer disabled:bg-[#161b22] disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          {isLoadingRepositories ? "Loading more..." : "Load More"}
        </button>
      )}
    </>
  );
};
