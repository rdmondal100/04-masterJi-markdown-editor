function convertMarkdown(text) {
    return text
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/\*(.*?)\*/g, '<i>$1</i>')
        .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
        .replace(/\`(.*?)\`/g, '<code>$1</code>')
        .replace(/- \[x\] (.*$)/gm, '<input type="checkbox" checked disabled> $1')
        .replace(/- \[ \] (.*$)/gm, '<input type="checkbox" disabled> $1')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
        .replace(/\n/g, '<br>');
}

document.getElementById('markdown-input').addEventListener('input', function() {
    document.getElementById('preview').innerHTML = convertMarkdown(this.value);
});



const resetBtn = document.getElementById("resetBtn")
if(resetBtn){
    resetBtn.addEventListener('click',()=>{
        const markdownInput = document.getElementById("markdown-input")
        const previewContainer = document.getElementById("preview")
        console.log(markdownInput)
        markdownInput.value = ''
        previewContainer.innerHTML = ''
        console.log("reset")
    })
}