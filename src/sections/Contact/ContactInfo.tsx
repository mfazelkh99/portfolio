export default function ContactInfo() {
    return (
        <div>

            <h3 className="text-2xl font-semibold">
                Get in touch
            </h3>

            <p className="mt-4 max-w-xl text-lg leading-8 text-gray-600">
                I'm always open to discussing new projects, creative ideas,
                or opportunities to be part of your vision.
            </p>

            <div className="mt-10 space-y-6">

                <div>
                    <p className="text-sm font-medium text-gray-500">
                        Email
                    </p>

                    <a
                        href="mailto:your@email.com"
                        className="mt-1 block text-lg font-medium"
                    >
                        your@email.com
                    </a>
                </div>

                <div>
                    <p className="text-sm font-medium text-gray-500">
                        Location
                    </p>

                    <p className="mt-1 text-lg font-medium">
                        Iran
                    </p>
                </div>

            </div>

        </div>
    );
}