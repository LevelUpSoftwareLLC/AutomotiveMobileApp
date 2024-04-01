type TrieNodeChildren = {
    [key: string]: TrieNode;
};

class TrieNode {
    children: TrieNodeChildren;
    endOfWord: boolean;

    constructor() {
        this.children = {};
        this.endOfWord = false;
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode();
    }

    // Insert a word into the trie
    insert(word: string): void {
        let current = this.root;
        for (const char of word) {
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.endOfWord = true;
    }

    // Find all words in trie that start with the given prefix
    findCompletions(prefix: string): string[] {
        let current = this.root;
        for (const char of prefix) {
            if (!current.children[char]) {
                return []; // No completions if prefix not found
            }
            current = current.children[char];
        }
        return this._findWordsFromNode(current, prefix);
    }

    // Helper function to recursively find all words from a given node
    private _findWordsFromNode(node: TrieNode, prefix: string): string[] {
        let words: string[] = [];
        if (node.endOfWord) {
            words.push(prefix);
        }
        for (const char in node.children) {
            words = words.concat(this._findWordsFromNode(node.children[char], prefix + char));
        }
        return words;
    }
}
