import Node from "./components/node.jsx";
import useTreeData from "./hooks/useTreeData.jsx";
import "./styles/main.css";

function App() {
    const { treeData, loading, error } = useTreeData();

    if (loading)
        return (
            <>
                <div className="center-wrapper">
                    <div className="loader">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </div>
            </>
        );
    if (error)
        return (
            <>
                <div className="center-wrapper">
                    <div className="loader"></div>
                </div>
            </>
        );

    return (
        <div className="App">
            <div className="tree-container">
                {treeData ? (
                    Object.entries(treeData).map(([nodeName, nodeData], i) => (
                        <Node
                            key={`root-node-${i}`}
                            data={{
                                name: nodeName,
                                ...nodeData,
                                children: nodeData.children || {}
                            }}
                        />
                    ))
                ) : (
                    <div className="center-wrapper">
                        <div className="loader">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
