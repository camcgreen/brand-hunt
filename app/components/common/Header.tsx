export default function Header() {
    return (
        <header className="absolute left-0 top-0 h-16 flex justify-between items-center p-4 select-none">
            <img
                src="/images/logo.svg"
                alt="Brand logo"
                className="w-6 md:w-8"
            />
        </header>
    );
}
