import React, { useState } from "react";

function Node(props) {
    const {
        name,
        isDirectory,
        extention,
        size,
        content,
        permission,
        modified_at,
        children = {}
    } = props.data;

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="tree-node" style={{ width: "100%" }}>
            <div
                className="node-header"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isDirectory ? (isExpanded ? "📂" : "📁") : "📄"} {name}
            </div>

            {isExpanded && (
                <div className="node-details">
                    {!isDirectory && (
                        <div className="notification node-info">
                            <div className="notiglow"></div>
                            <div className="notiborderglow"></div>
                            <div className="notibody">
                                {extention && <p>↪ Type: {extention}</p>}
                                {size && <p>↪ Size: {size}</p>}
                                {permission && (
                                    <p>↪ Permission: {permission}</p>
                                )}
                                {modified_at && (
                                    <p>↪ Modified: {modified_at}</p>
                                )}
                                {content && <p>↪ Content: {content}</p>}
                            </div>
                        </div>
                    )}

                    {isDirectory && (
                        <div className="node-children">
                            {Object.entries(children).map(
                                ([childName, childData], index) => (
                                    <Node
                                        key={`${name}-child-${index}`}
                                        data={{
                                            ...childData,
                                            children: childData.children || {}
                                        }}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Node;
