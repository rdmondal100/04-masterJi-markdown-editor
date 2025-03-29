

function convertMarkdown(text) {
    // Convert headers
    text = text
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>');

    // Convert bold and italic text
    text = text
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>');

    // Convert code blocks and inline code
    text = text
        .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
        .replace(/`(.*?)`/g, '<code>$1</code>');

    // Convert checkboxes
    text = text
        .replace(/- \[x\] (.*$)/gm, '<input type="checkbox" checked disabled> $1')
        .replace(/- \[ \] (.*$)/gm, '<input type="checkbox" disabled> $1');

    // Convert links
    text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Handle unordered lists
    text = text.replace(/(?:^|\n)(- .+(?:\n- .+)*)/g, function (match) {
        let listItems = match.trim().split("\n").map(item => `<li>${item.substring(2)}</li>`).join("\n");
        return `<ul>\n${listItems}\n</ul>`;
    });

    // Handle ordered lists
    text = text.replace(/(?:^|\n)(\d+\. .+(?:\n\d+\. .+)*)/g, function (match) {
        let listItems = match.trim().split("\n").map(item => `<li>${item.substring(3)}</li>`).join("\n");
        return `<ol>\n${listItems}\n</ol>`;
    });

    // Wrap normal text in <p>, but avoid empty lines and elements that shouldn't be inside <p>
    text = text.replace(/(?:^|\n)(?!<)([^\n<>]+)(?:\n|$)/g, '<p>$1</p>');

    // Remove empty <p> tags
    text = text.replace(/<p>\s*<\/p>/g, '');

    // remove unnecessary <br>
    text = text.replace(/<ul>\s*<br>/g, '<ul>')
                .replace(/<\/ul>\s*<br>/g, '</ul>')
                .replace(/<ol>\s*<br>/g, '<ol>')
                .replace(/<\/ol>\s*<br>/g, '</ol>');

    // Prevent <p> inside <ul> or <ol>
    text = text.replace(/(<ul>|<ol>)\s*<p>/g, '$1')
                .replace(/<\/p>\s*(<\/ul>|<\/ol>)/g, '$1');

    // Convert new lines into <br>, but avoid breaking lists
    text = text.replace(/(?<!<\/?(ul|ol|li|h1|h2|h3|pre|code|input|a)>)\n/g, '<br>');

    return text;
}

document.getElementById('markdown-input').addEventListener('input', function() {
    document.getElementById('preview').innerHTML = convertMarkdown(this.value);
});

const resetBtn = document.getElementById("resetBtn");
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        const markdownInput = document.getElementById("markdown-input");
        const previewContainer = document.getElementById("preview");
        markdownInput.value = '';
        previewContainer.innerHTML = '';
    });
}

