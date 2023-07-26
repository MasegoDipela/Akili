import Image from "next/image";

interface EmptyProps {
    label: string;
}

export const Empty = ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-xol items-center
        justify-center">
            <div className="relative h-80 w-80">
                <Image 
                    alt="Empty"
                    fill
                    src="/empty.png"
                />
            </div>
        </div>
    );
}