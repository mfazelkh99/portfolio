const socials = [
    {
        name: "GitHub",
        username: "@mfazelkh99",
        href: "https://github.com/mfazelkh99",
    },
    {
        name: "LinkedIn",
        username: "Your LinkedIn",
        href: "#",
    },
    {
        name: "Instagram",
        username: "Your Instagram",
        href: "#",
    },
];

export default function ContactSocials() {
    return (
        <div>

            <h3 className="text-2xl font-semibold">
                Connect with me
            </h3>

            <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">
                You can also find me on these platforms.
            </p>

            <div className="mt-10 space-y-4">

                {socials.map((social) => (

                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-xl border border-gray-200 p-5 transition hover:border-gray-400"
                    >

                        <p className="text-lg font-medium">
                            {social.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {social.username}
                        </p>

                    </a>

                ))}

            </div>

        </div>
    );
}