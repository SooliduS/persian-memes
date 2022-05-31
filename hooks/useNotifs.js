import { useContext} from "react";
import NotifContext from "../contexts/NotifsContext";

const useNotifs = () => {
    return useContext(NotifContext);
}

export default useNotifs;