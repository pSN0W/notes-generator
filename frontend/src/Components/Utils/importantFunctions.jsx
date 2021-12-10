import { useContext,useEffect } from "react"
import { MessageContext } from "../../Pages/NotesPage";

export const useFun = () => {
    const updateMessageBox = useContext(MessageContext);
    updateMessageBox("Hello World","danger");
}
