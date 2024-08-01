## Create & Renew certificate

<ul>
<li>I = individual</li>
<li>C = corporate</li>
</ul>

<p>Steps to follow to run below test cases</p>
<ul>
<li> <code>npm install</code> </li>
<li><code>cd src</code></li>
<li><code>cd suites-ap</code></li>
<li>In index.js of createCert, there is requirement of chromium path on your device if don't have chromium then comment down this line
<code>executablePath: "/opt/homebrew/bin/chromium"</code>
</li>
<li>then run the CLI commands</li>
</ul>

| S.No. | Test Case                  | Description                              | CLI command                       | Status |
| :---- | :------------------------- | :--------------------------------------- | :-------------------------------- | :----- |
| 1.    | New Vehicle Certificate, I | Create certificate for I on Fixed plan   | `node createCert new I`           | Done   |
| 2.    | New Vehicle Certificate, I | Create certificate for I on Dynamic plan | `node createCert new I dynamic`   | Done   |
| 3.    | New Vehicle Certificate, I | Create certificate for I on Special plan | `node createCert new I special`   | Done   |
| 4.    | Old Vehicle Certificate, I | Renew certificate for I on Fixed plan    | `node createCert renew I`         | Done   |
| 5.    | Old Vehicle Certificate, I | Renew certificate for I on Dynamic plan  | `node createCert renew I dynamic` | Done   |
| 6.    | Old Vehicle Certificate, I | Renew certificate for I on Special plan  | `node createCert renew I special` | Done   |
| 7.    | New Vehicle Certificate, C | Create certificate for C on Fixed        | `node createCert new C`           | Done   |
| 8.    | Old Vehicle Certificate, C | Create certificate for C on Fixed        | `node createCert renew C`         | Done   |
| 9.    | New Vehicle Certificate, C | Create certificate for C on Special      | `node createCert new C special`   | Done   |
| 10.   | Old Vehicle Certificate, C | Create certificate for C on Special      | `node createCert renew C special` | Done   |
| 11.   | New Vehicle Certificate, C | Create certificate for C on Dynamic      | `node createCert new C dynamic`   | Done   |
| 12.   | Old Vehicle Certificate, C | Create certificate for C on Special      | `node createCert renew C dynamic` | Done   |
