# 国际化

1. 使用库

- react-intl

2. 提供

- IntlProvider
  - `<IntlProvider locales={语言} messages={语言包}>...</IntlProvider>`
  - 给后代组件提供语言和语言包
- FormattedMessage 格式化文本
  - `<FormattedMessage id="要使用语言包的属性" defaultMessage="默认值"/>`
- useIntl
  ```js
  const intl = useIntl();
  intl.formatMessage({ id: 要使用语言包的属性, defaultMessage: 默认值 });
  ```
