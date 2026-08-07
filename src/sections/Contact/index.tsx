import ContactInfo from "./ContactInfo";
import ContactSocials from "./ContactSocials";

export default function Contact() {
    return (
        <section
            id="contact"
            className="bg-white pb-8"
        >
            <div className="mx-auto max-w-7xl px-8">

                <div className="mb-24 text-center">

                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">
                        Contact
                    </p>

                    <h2 className="text-5xl font-bold">
                        Let's Work Together
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
                        Have a project in mind or want to work together?
                        Feel free to get in touch.
                    </p>

                </div>

                <div className="grid gap-16 lg:grid-cols-2">

                    <ContactInfo />

                    <ContactSocials />

                </div>

            </div>
        </section>
    );
}