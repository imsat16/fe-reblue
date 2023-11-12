import { useRouter } from "next/navigation";

const useBackButton = () => {
    const router = useRouter()

    const back = router.back
  
    return back;
  };
  
  export default useBackButton;