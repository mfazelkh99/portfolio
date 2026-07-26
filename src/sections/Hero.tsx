const skills = ["Python", "PHP", "React", "Next.js", "MySQL"]

export default function Hero() {
    return (
        <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center justify-between px-8">

            {/* Left Side */}
            <div className="max-w-2xl">

                <p className="mb-4 text-lg text-gray-500">
                    Hello, I'm
                </p>

                <h1 className="mb-6 text-7xl font-bold leading-tight">
                    Mohammad Fazel
                    <br />
                    Khorrami
                </h1>

                <h2 className="mb-8 text-3xl font-medium text-gray-700">
                    Software Engineer &
                    <br />
                    Full-Stack Web Developer
                </h2>

                <p className="mb-10 leading-8 text-gray-500">
                    I design and develop modern web applications,
                    automation systems, CRM platforms and intelligent bots
                    focused on performance, scalability and user experience.
                </p>

                <div className="flex gap-5">

                    <button className="rounded-xl bg-black px-7 py-4 font-medium text-white transition hover:bg-gray-800">
                        Download Resume
                    </button>

                    <button className="rounded-xl border border-gray-300 px-7 py-4 font-medium transition hover:bg-gray-100">
                        View Projects
                    </button>
                </div>
                <div className="h-[1200px]" />
                <div className="mt-14 flex flex-wrap gap-3">

                    {skills.map((item) => (
                        <span
                            key={item}
                            className="rounded-full border border-gray-300 px-4 py-2 text-sm text-gray-700"
                        >
                            {item}
                        </span>
                    ))}

                </div>

            </div>

            {/* Right Side */}

            <div className="flex h-[500px] w-[450px] items-center justify-center rounded-3xl bg-gray-100">

                <span className="text-gray-400">
                    Profile Image
                </span>

            </div>

        </section>
    );
}