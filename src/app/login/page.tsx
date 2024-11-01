import LoginForm from '@/app/ui/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <main className="flex items-center justify-center md:h-screen">
            <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
                <Image src={'/start_canada_icon.png'} alt='Start New' height={1} width={350} />
                <LoginForm />
            </div>
        </main>
    );
}