import Agent from "@/components/Agent";
import React from "react";
import {currentUser} from "@clerk/nextjs/server";
import Image from "next/image";

const page = async() => {
   const user = await currentUser();

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
                            <div className="flex items-center gap-2">
                                <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden">
                                    <Image src="/images/ai-avatar.png" alt="User" width={35} height={35} />
                                </div>
            
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">                                
                                        <div className="subject-badge max-sm:hidden">
                                            <h3>Quiz Generation</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                           
                        </article>
      <Agent userName={user?.firstName ?? "Guest"} userId={user?.id} type="generate"/>
    </main>
  );
};

export default page;
