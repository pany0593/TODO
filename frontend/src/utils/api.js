const BASE_URL = "http://localhost:5000"; // Flask 后端地址

export const fetchMemos = async () => {
    const response = await fetch(`${BASE_URL}/memos`);
    return response.json();
};

export const addMemo = async (memo) => {
    const response = await fetch(`${BASE_URL}/memos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memo),
    });
    return response.json();
};
