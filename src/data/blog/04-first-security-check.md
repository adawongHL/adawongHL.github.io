---
title: "What I learned running security checks on a website"
description: "XSS, Session Hijacking, Web Shell"
date: "2026-01-21"
image: "/images/line-abstract.jpg"
highlight: false
--- 

# Intro

This post documents a few vulnerabilities I identified while running some security tests on a local copy of a web application I helped maintain. Everything was done on non-production systems, and no real user data was touched.

My goal wasn’t to hack the website, but to understand attack surfaces and see how small oversights might balloon into security risks. I share certain details for educational purposes and redact any sensitive info. 


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
These weren’t fancy exploits, but they were damaging because the designers had placed implicit trust on user input. Sensitive data could be leaked and access control broken. Moving forward, this has changed how I review features: I not only consider if something works, but also what assumptions they make about user input, and what it trusts. 


