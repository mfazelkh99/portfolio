import Image from "next/image";
import { motion, MotionValue } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext"; // 👈 ایمپورت اضافه شود

interface ProjectImageProps {
    title: string;
    scale: MotionValue<number>;
    y: MotionValue<number>;
    x: MotionValue<number>;
    reverse: boolean;
    media: {
        type: "image" | "video";
        src: string;
    };
}

export default function ProjectImage({
    title,
    scale,
    y,
    x,
    reverse,
    media,
}: ProjectImageProps) {

    const { isFa } = useLanguage(); // 👈 دریافت وضعیت زبان
    // 👈 برعکس کردن نقطه شروع انیمیشن عکس
    const baseInitialX = reverse ? -120 : 120;
    const finalInitialX = isFa ? -baseInitialX : baseInitialX;

    return (
        <motion.div
            initial={{
                x: finalInitialX,
                opacity: 0,
                scale: 0.92,
            }}

            whileInView={{
                x: 0,
                opacity: 1,
                scale: 1,
            }}

            viewport={{
                amount: 0.5,
                once: false,
            }}

            transition={{
                type: "spring",
                stiffness: 20,
                damping: 10,
            }}

            className="
                relative
                w-fit
                max-w-2xl
                mx-auto
                group
            "
        >
            <div
                className="
                    rounded-[32px]
                    bg-white
                    

                    shadow-[0_35px_80px_rgba(0,0,0,.12)]

                    border
                    border-white/70

                    overflow-hidden
                "
            >
                {/* <div
                    className="
                        flex
                        items-center
                        gap-2
                        pb-4
                    "
                >
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                </div> */}
                {media.type === "video" ? (
                    <video
                        src={media.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="
                            block
                            h-auto
                            w-auto
                            max-w-full
                            max-h-[500px]
                            rounded-2xl
                            object-contain
                            transition-all
                            duration-500
                        "
                    />
                ) : (
                    <Image
                        src={media.src}
                        alt={title}
                        width={900}
                        height={600}
                        className="
                        rounded-2xl
                        object-cover
                        transition-all
                        duration-500
                    "
                    />
                )}
            </div>
            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/10
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    rounded-[32px]
                "
            />
        </motion.div>
    );
}