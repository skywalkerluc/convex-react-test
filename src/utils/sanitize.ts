export const sanitizeBusinessName = (name: string): string => {
    return name
        .replace(/^[\s"%&#]+|[\s"%&#]+$/g, '')
        .replace(/\s*,\s*$/, '')
        .replace(/\s{2,}/g, ' ')
      .trim();
  };