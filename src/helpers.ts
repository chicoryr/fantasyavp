import { useRouter } from "next/navigation";

export function Redirect(url: string){
    const router = useRouter();
    router.push(url);
}
