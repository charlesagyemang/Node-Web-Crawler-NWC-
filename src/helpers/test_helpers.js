export const sanitizeRegexField = (regexArray) => {
  const sanitizedRegexes = [];
  regexArray.forEach((regex) => {
    const divide = regex.split('/');
    if (divide.length === 2) {
      if (divide[0].length > 1) {
        sanitizedRegexes.push(`/${divide[0]}/`);
        return;
      }
      sanitizedRegexes.push(`/${divide[1]}/`);
      return;
    }

    if (divide.length === 1) {
      if (divide[0] === '') {
        sanitizedRegexes.push('');
        return;
      }
      sanitizedRegexes.push(`/${divide[0]}/`);
      return;
    }

    sanitizedRegexes.push(regex);
  });
  return sanitizedRegexes;
};
