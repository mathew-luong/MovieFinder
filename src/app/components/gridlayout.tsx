// Displays movie thumbnails in a responsive grid
export const Gridlayout = ({ children }: { children: React.ReactNode }) => {
    return (
        // <div className="grid grid-flow-row grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        <div className="grid grid-flow-row gap-4 grid-cols-fluid">
            {children}
        </div>
    );
};
