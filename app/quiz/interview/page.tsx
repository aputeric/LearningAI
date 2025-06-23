import Agent from "@/components/Agent";
import React from "react";
import {currentUser} from "@clerk/nextjs/server";

const page = async() => {
   const user = await currentUser();
  return (
    <>
      <h3>Quiz Generation</h3>
      <Agent userName={user?.firstName ?? "Guest"} userId={user?.id} type="generate"/>
    </>
  );
};

export default page;
