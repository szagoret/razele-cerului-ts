export type StanzaType = {
    type: "stanza" | "refrain",
    sequence: number,
    lines: Array<string>
};

export type SongType = {
    index: number,
    title: string,
    stanzas: Array<StanzaType>,
    topic: string
};