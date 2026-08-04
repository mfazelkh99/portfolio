import Image from "next/image";
import { motion, MotionValue } from "framer-motion";

interface ProjectImageProps {
    image: string;
    title: string;
    scale: MotionValue<number>;
    y: MotionValue<number>;
    x: MotionValue<number>;
    reverse: boolean;
}

export default function ProjectImage({
    image,
    title,
    scale,
    y,
    x,
    reverse,
}: ProjectImageProps) {
    return (
        <motion.div
            initial={{
                x: reverse ? -120 : 120,
                opacity: 0,
                scale: 0.92,
            }}

            whileInView={{
                x: 0,
                opacity: 1,
                scale: 1,
            }}

            viewport={{
                amount: 0.6,
                once: false,
            }}
            className="
                relative
                w-full
                max-w-2xl
                mx-auto
                group
            "
        >
            <div
                className="
                    rounded-[32px]
                    bg-white
                    p-5

                    shadow-[0_35px_80px_rgba(0,0,0,.12)]

                    border
                    border-white/70

                    overflow-hidden
                "
            >
                <div
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
                </div>
                <Image
                    src={image}
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
                "
            />
        </motion.div>
    );
}