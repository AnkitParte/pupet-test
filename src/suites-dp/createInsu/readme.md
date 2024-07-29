## Create & Renew insurance

<p>Everytime creating a new policy or renew you have to write the new registration number</p>

<ul>
<li>I = individual</li>
<li>C = corporate</li>
</ul>

<p>Do cd src then do cd suites-ap then run the CLI commands to test create insurance</p>
<p>While testing whenever creating or renewing a policy one should have to change Registration number(in quotePage.js) and chassis number(in policyPage.js) otherwise test case will going to fail</p>

| S.No. | Test Case                                | Description                                             | CLI command                      | Status |
| :---- | :--------------------------------------- | :------------------------------------------------------ | :------------------------------- | :----- |
| 1.    | New Policy, I                            | Create new policy for I                                 | `node createInsu new `           | Done   |
| 2.    | New Policy, C (Proprietor)               | Create new policy for C, proprietor                     | `node createInsu new 1`          | Done   |
| 3.    | New Policy, C (Partnership)              | Create new policy for C, partnership                    | `node createInsu new 2`          | Done   |
| 4.    | New Policy, C (Public)                   | Create new policy for C, public                         | `node createInsu new 3`          | Done   |
| 5.    | New Policy, C (Private)                  | Create new policy for C, private                        | `node createInsu new 4`          | Done   |
| 6.    | Renew Policy, I (Not Expired)            | Renew policy for I , not expired                        | `node createInsu renew none I`   | Done   |
| 7.    | Renew Policy, I (Expired within 90 days) | Renew policy for I , with 90 days                       | `node createInsu renew 1 I`      | Done   |
| 8.    | Renew Policy, I (Expired over 90 days)   | Renew policy for I, 90 days over expired                | `node createInsu renew 2 I`      | Done   |
| 9.    | Renew Policy, C (Not Expired)            | Renew policy for C , not expired, proprietor            | `node createInsu renew none C 1` | Done   |
| 10.   | Renew Policy, C (Expired within 90 days) | Renew policy for C , with 90 days, proprietor           | `node createInsu renew 1 C 1`    | Done   |
| 11.   | Renew Policy, C (Expired over 90 days)   | Renew policy for C, , 90 days over expired, proprietor  | `node createInsu renew 2 C 1`    | Done   |
| 12.   | Renew Policy, C (Not Expired)            | Renew policy for C , not expired, partnership           | `node createInsu renew none C 2` | Done   |
| 13.   | Renew Policy, C (Expired within 90 days) | Renew policy for C , with 90 days, partnership          | `node createInsu renew 1 C 2`    | Done   |
| 14.   | Renew Policy, C (Expired over 90 days)   | Renew policy for C, , 90 days over expired, partnership | `node createInsu renew 2 C 2`    | Done   |
| 15.   | Renew Policy, C (Not Expired)            | Renew policy for C , not expired, public                | `node createInsu renew none C 3` | Done   |
| 16.   | Renew Policy, C (Expired within 90 days) | Renew policy for C , with 90 days, public               | `node createInsu renew 1 C 3`    | Done   |
| 17.   | Renew Policy, C (Expired over 90 days)   | Renew policy for C, , 90 days over expired, public      | `node createInsu renew 2 C 3`    | Done   |
| 18.   | Renew Policy, C (Not Expired)            | Renew policy for C , not expired, private               | `node createInsu renew none C 4` | Done   |
| 19.   | Renew Policy, C (Expired within 90 days) | Renew policy for C , with 90 days, private              | `node createInsu renew 1 C 4`    | Done   |
| 20.   | Renew Policy, C (Expired over 90 days)   | Renew policy for C, , 90 days over expired, private     | `node createInsu renew 2 C 4`    | Done   |
