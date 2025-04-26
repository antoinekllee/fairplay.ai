import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="/" className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">
                                F
                            </span>
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                            Fairplay AI
                        </span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">{children}</div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="https://picsum.photos/960/1080"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    );
};

export default Layout;
