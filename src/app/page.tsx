import E2EEProvider from '@/components/e2ee-demo/provider';
import Header from '@/components/e2ee-demo/ui/header';
import MessageComposer from '@/components/e2ee-demo/ui/message-composer';
import UserPanel from '@/components/e2ee-demo/ui/user-panel';

export default function Home() {
    return (
        <div className="h-screen bg-neutral-50 dark:bg-neutral-900 p-8 font-sans">
            <div className="max-h-[calc(100vh-(theme(space.8)*2))] h-[calc(100vh-(theme(space.8)*2))] w-[calc(100vw-(theme(space.8)*2))] grid md:grid-cols-12 gap-6">
                <Header className="h-full overflow-y-hidden col-span-3 bg-transparent" />
                <div className="h-full overflow-y-hidden col-span-9 rounded-lg grid grid-rows-[1fr_auto] gap-6">
                    <div className="grid md:grid-cols-2 gap-6 h-full overflow-hidden">
                        <UserPanel userName="alice" />
                        <UserPanel userName="john" />
                    </div>

                    <MessageComposer />
                </div>
            </div>
        </div>
    );
}
