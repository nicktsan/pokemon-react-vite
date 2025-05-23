import { useQuery } from "@tanstack/react-query";

function Login() {
    const { data: token, isLoading, error } = useQuery({
        queryFn: () =>
            fetch(`http://localhost:8080/login`).then(
                (res) => res.json()
            ),
        queryKey: ['token'],
    });
    return (
        <div>
            <h1>Login</h1>
            {isLoading && <h2>Loading...</h2>}
            {error && <div className="error">Error: error fetching</div>}
            {token && (
                <div>{token.access_token}</div>
            )}
        </div>
    );
};

export default Login;