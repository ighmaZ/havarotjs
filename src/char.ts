import { taamim } from "./utils/regularExpressions";
const consonants = /[\u{05D0}-\u{05F2}]/u;
const ligature = /[\u{05C1}-\u{05C2}]/u;
const dagesh = /[\u{05BC}\u{05BF}]/u; // includes rafe
const niqqud = /[\u{05B0}-\u{05BB}\u{05C7}]/u;

/**
 * A Hebrew character and its positioning number for being sequenced correctly.
 * See [[`Cluster`]] for correct normalization.
 */
export class Char {
  #text: string;

  constructor(char: string) {
    this.#text = char;
  }

  /**
   * @returns the text of the Char
   *
   * ```typescript
   * const text: Text = new Text("אֱלֹהִ֑ים");
   * text.chars[0].text;
   * // "א"
   * ```
   */
  get text(): string {
    return this.#text;
  }

  private findPos(): number {
    const char = this.text;
    if (consonants.test(char)) {
      return 0;
    }
    if (ligature.test(char)) {
      return 1;
    }
    if (dagesh.test(char)) {
      return 2;
    }
    if (niqqud.test(char)) {
      return 3;
    }
    if (taamim.test(char)) {
      return 4;
    }
    // i.e. any non-hebrew char
    return 10;
  }

  /**
   * @returns a number used for sequencing
   *
   * - consonants = 0
   * - ligatures = 1
   * - dagesh or rafe = 2
   * - niqqud (i.e vowels) = 3
   * - taamim (i.e. accents) = 4
   *
   * ```typescript
   * const text: Text = new Text("אֱלֹהִ֑ים");
   * text.chars[0].sequencePosition; // the aleph
   * // 0
   * text.chars[1].sequencePosition; // the segol
   * // 3
   * ```
   */
  get sequencePosition(): number {
    return this.findPos();
  }
}
