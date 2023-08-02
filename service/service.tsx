export const fetchWithCatch = async (url: string) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return null;
    }
};