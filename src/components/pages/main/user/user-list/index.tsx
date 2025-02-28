import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { useUserRepositoryContext } from "@/contexts/user-repository.context";
import { UserNameProfile } from "../user-name-profile";
import { Message } from "@/components/ui/message";
import { UserNameProfilePlaceholder } from "../user-name-profile-placeholder";
import { RepositoryList } from "../../repository/repository-list";

export const UserList: React.FC = () => {
  const {
    users,
    isLoadingUsers,
    selectedAccordion,
    paramsGetUsers,
    handleSelectedAccordion,
  } = useUserRepositoryContext();

  const handleOpenAccordion = (username: string) => {
    handleSelectedAccordion(username);
  };

  const handleCloseAccordion = () => {
    handleSelectedAccordion("");
  };

  return (
    <>
      {users?.map((user) => (
        <Accordion
          key={user.id}
          title={
            <UserNameProfile imageUrl={user.avatar_url} username={user.login} />
          }
          isOpen={user.login === selectedAccordion}
          onOpen={() => handleOpenAccordion(user.login)}
          onClose={handleCloseAccordion}
        >
          <RepositoryList />
        </Accordion>
      ))}

      <UserNameProfilePlaceholder
        count={paramsGetUsers.per_page}
        isVisible={isLoadingUsers}
      />

      {!users.length && !!paramsGetUsers.q && !isLoadingUsers && (
        <Message
          title="Your search did not match any users"
          message="Try adjusting your search criteria."
        />
      )}

      {!users.length && !paramsGetUsers.q && !isLoadingUsers && (
        <Message
          imageSrc="https://github.com/images/modules/search/home-desktop-light2x.png"
          title="Discover GitHub Users"
          message="Uncover talented developers and explore their repositories. Start your search now!"
        />
      )}
    </>
  );
};
