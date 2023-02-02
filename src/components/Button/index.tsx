type ButtonProps = {
    name: string
    color: string
}

export const Button = (props: ButtonProps) => {

    return (
        <button
            className={"py-2 px-4 bg-" + props.color + "-500 text-white font-semibold rounded-lg shadow-md hover:bg-" + props.color + "-700 focus:outline-none focus:ring-2 focus:ring-" + props.color + "-400 focus:ring-opacity-75 w-28 mx-auto"}
        >
            {props.name}
        </button>
    )
}
