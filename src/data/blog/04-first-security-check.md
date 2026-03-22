---
title: "What I learnt running security checks on a website"
description: "XSS, Session Hijacking, Web Shell"
date: "2026-01-21"
image: "/images/line-abstract.jpg"
highlight: false
visible: true
number: 2
--- 

# Intro

I'm documenting some vulnerabilities I found while running security checks on a local copy of a web app I maintained. Everything was done on non-production systems so I'm not compromising real user data (important!). My goal wasn’t to hack, but to understand attack surfaces and how they might be exploited. Here, I walk through my thought process without including any sensitive details. 


# Launching a stored XSS attack

For a start, I found a page for students to submit links to their LinkedIn profile. However, this input is neither checked nor sanitised, making it a clear attack surface. 

A payload might follow this template: 

```
<script>
    // arbitrary JS executed in the victim's browser
</script>
```

This is particularly dangerous because the input gets stored on the database. Anytime a TA or professor clicks on it to check the student’s work, the script runs. 

**Fix:** Always check and sanitise user inputs. This page blindly trusts what the user enters, which is unsafe practice.

**Takeaway:** Tiny inputs can do big damage


# Stealing cookies 

Using the previous XSS attack, a user’s cookie can be stolen and have their session hijacked. 

Brief recap, the website has a page for students to submit links to their LinkedIn profiles. However, since this input is not checked or sanitized, students can submit whatever they want. 

In my test, the injected script silently forwards the victim’s session cookie to a server endpoint set up by the attacker. This is what the attacker might see on their server: 

![Victim's cookie forwarded to attacker's server](/posts-content/session-hijack-cookie.png)


With the cookie, an attacker could impersonate the victim’s session, essentially logging in as them. This bypasses access control, and the attacker can act with the victim’s privileges. 


# Popping a web shell

Next, I identified another vulnerable page which accepts file uploads. Since file uploads are unrestricted, I was able to upload a server-side script that followed the template below. It carries my shell commands to the web server, and grants shell access through the browser. 

```
<?php
    // execute a command provided via a GET parameter named ‘cmd’
?>
```

After uploading the file and clicking on it, I gained access to a web shell. In my test, I was able to list all the files in the root directory and look into each etc.

**Fix:** Enforce an allowlist of permissible file extensions for uploads. Ban anything dangerous like .php files. Check file signatures to ensure they are of the file type as claimed in the header.

**Takeaway:** Always check file uploads - do not blindly trust what users supply.


# Conclusion
Although these weren't fancy exploits, results were pretty damaging with leaked data and broken access control. It goes to show that we must guard against user inputs and not trust blindly. 

