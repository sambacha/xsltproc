#!/bin/bash
# XSLT Lint
# source: https://github.com/greystate/XSLT-Lint
echo -ne "==> XSLT Linting..."

msg=$(xsltproc --xinclude $PATH_TO_XSLT_LINT_FILE $CK_INPUT_PATH)
if [[ "" = "$msg" ]]; then
	exit 0
else
	echo $msg >&2
	exit 1
fi
