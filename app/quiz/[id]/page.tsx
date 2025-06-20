
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";


interface CompanionSessionPageProps {
    params: Promise<{ id: string}>;
}

const QuizSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    
    const user = await currentUser();

   

    if(!user) redirect('/sign-in');
    

    return (
        <main>
           <p>{id}</p>
        </main>
    )
}

export default QuizSession
