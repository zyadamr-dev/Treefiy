import { useEffect, useState } from "react";
import { getTree } from "../services/fetchTree.js";

export default function useTreeData() {
    const [treeData, setTreeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTree();
                setTreeData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { treeData, loading, error };
}
