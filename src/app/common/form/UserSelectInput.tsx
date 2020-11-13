import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Field } from "react-final-form";
import { useStores } from "../../stores/helpers/useStores";
import SelectInput from "./SelectInput";

const UserSelectInput = () => {
  let postUsers: any = [{ key: 0, text: "Select User", value: 0 }];
  const {
    dataStores: { userStore },
  } = useStores();

  useEffect(() => {
    userStore.loadUsers();
  }, [userStore]);

  if (!userStore.loadingIntial) {
    //postUsers = [];
    userStore.users.forEach(function (user) {
      postUsers.push({ key: user.id, text: user.name, value: user.id });
    });
    return (
      <Field
        name="userId"
        placeholder="Select User"
        options={postUsers}
        component={SelectInput}
      />
    );
  } else {
    return (
      <Field
        name="userId"
        placeholder="Loading Users"
        options={postUsers}
        component={SelectInput}
      />
    );
  }
};

export default observer(UserSelectInput);
