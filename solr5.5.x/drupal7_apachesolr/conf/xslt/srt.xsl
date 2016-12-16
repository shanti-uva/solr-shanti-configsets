<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="text" encoding="UTF-8"/>

    <xsl:decimal-format name="euro" decimal-separator="," grouping-separator="."/>

    <xsl:template match="/">
        <xsl:apply-templates select="response/result/doc"/>
    </xsl:template>

    <xsl:template match="doc">
        <xsl:value-of select="position()"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:call-template name="convertTime">
            <xsl:with-param name="seconds" select="float[@name='fts_start']"/>
        </xsl:call-template>
        <xsl:text> --&gt; </xsl:text>
        <xsl:call-template name="convertTime">
            <xsl:with-param name="seconds" select="float[@name='fts_end']"/>
        </xsl:call-template>
        <xsl:text>&#xa;</xsl:text>
        <xsl:apply-templates select="str"/>
        <xsl:text>&#xa;</xsl:text>
        <xsl:text>&#xa;</xsl:text>
    </xsl:template>

    <xsl:template name="convertTime">
        <xsl:param name="seconds" select="'0'"/>
        
        <xsl:choose>
            <xsl:when test="$seconds = 0">
                <xsl:text>00:00:00,000</xsl:text>
            </xsl:when>
            <xsl:otherwise>
                <xsl:variable name="decimal" select="format-number($seconds mod 1, '#,000', 'euro')"/>
                <xsl:value-of select="format-number(floor($seconds div 3600), '00')"/>
                <xsl:text>:</xsl:text>
                <xsl:value-of select="format-number(floor($seconds div 60), '00')"/>
                <xsl:text>:</xsl:text>
                <xsl:value-of select="format-number(floor($seconds mod 60), '00')"/>
                <xsl:value-of select="$decimal"/>
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>

</xsl:stylesheet>
