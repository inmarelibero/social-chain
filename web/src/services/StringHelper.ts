import truncateMiddle from 'truncate-middle';

export class StringHelper {
  /**
   *
   */
  static addressTruncateMiddle(str: string): string|null {
    return StringHelper.truncateMiddle(str, 6, 3);
  }

  /**
   *
   */
  static truncateMiddle(str: string, frontLen: number, backLen: number, truncateStr:string = '...'): string|null {
      if (typeof str !== 'string') {
          return null;
      }

    return truncateMiddle(str, frontLen, backLen, truncateStr);
  }
}
