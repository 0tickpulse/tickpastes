type PageParams = {
    id: string;
};

export default function PasteView({ params: { id } }: { params: PageParams }) {
    return <h1>Hello {id}</h1>;
}
