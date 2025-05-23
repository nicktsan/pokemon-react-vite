import { useQuery } from "@tanstack/react-query";

function SendTokens() {
    const { data: isAuthenticated, isLoading, error } = useQuery({
        queryFn: () =>
            fetch(`http://localhost:8080/isAuthenticated`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }).then(
                (res) => res.json()
            ),
        queryKey: ['isAuthenticated'],
    });
    return (
        <div>
            <h1>SendTokens</h1>
            {isLoading && <h2>Loading...</h2>}
            {error && <div className="error">Error: error fetching</div>}
            {isAuthenticated && (
                <div>
                    <h2>Authenticated</h2>
                    <p>{isAuthenticated.cookie_value}</p>
                </div>
            )}
            {!isAuthenticated && (
                <div>
                    <h2>Not Authenticated</h2>
                </div>
            )}
        </div>
    );
};

export default SendTokens;