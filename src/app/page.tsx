import E2EEProvider from '@/components/e2ee-demo/provider';
import Header from '@/components/e2ee-demo/ui/header';
import MessageComposer from '@/components/e2ee-demo/ui/message-composer';
import UserPanel from '@/components/e2ee-demo/ui/user-panel';

export default function Home() {
    return (
        <E2EEProvider>
            <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
                <div className="max-w-6xl mx-auto">
                    <Header />

                    <div className="grid md:grid-cols-2 gap-6">
                        <UserPanel userName="alice" />
                        <UserPanel userName="bob" />
                    </div>

                    <MessageComposer />
                </div>
            </div>
        </E2EEProvider>
    );
}
